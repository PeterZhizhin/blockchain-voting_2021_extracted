<?php

namespace App\Service;

use App\Service\Config\PoolConfig;
use App\Service\Config\FileConfig;

class Ispk
{
    protected $ispkConf;

    function __construct(FileConfig $config = null) {
        if (!empty($config)) $this->ispkConf = $config;
        else $this->ispkConf = PoolConfig::me()->get('Ispk');
    }

    public function sendEmail($userId, $subject, array $to, array $from, $message, array $status, array $form, $extId,$eno=false,$ssoId=false,$corpId=false,$phone=false)
    {
        $result = null;
        $requestData = array(
            'access_token' => $this->ispkConf->get('connstring/access_token', ''),
            'event_code' => '2020og',
            'event_id' => $extId,
            'date_time' => time(),
            'to'   => array(
                'email' => $to['email'],
            ),
            'data' => array(
                'subject' => $subject,
                'message' => $this->_convertMessage($message, array('dontWrapWithHtmlTag' => true)),
            )
        );

        if ($phone) {
            $requestData['to']['msisdn'] = '7' . $phone;
        }

        if ($eno) {
            $requestData['data']['eno'] = $eno;
        }

        $this->sendEvent($requestData);
        return $result;
    }

    public function sendEvent($dataReq, $attemptNumber = 1, $taskNumber = 0,$extId='') {
        $ch = curl_init($this->ispkConf->get("connstring/send"));

        curl_setopt($ch, CURLOPT_POST, 1);
        $data = json_encode($dataReq);

        $data =htmlspecialchars_decode($data);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);


        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Accept: application/json',
            'Content-Type: application/json; charset=utf-8',
            'Content-Length: '.mb_strlen($data)
        ));


        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_TIMEOUT, $this->ispkConf->get("connstring/timeout", 5));
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $this->ispkConf->get("connstring/timeout", 5) + 15);
        curl_setopt($ch, CURLINFO_HEADER_OUT, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        $response = curl_exec($ch);

        if (!curl_errno($ch)) {
            switch ($http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE)) {
                case 200:
                    $response = (array) json_decode($response);

                    if ($response["errorCode"] == 0) {
                        $result  = true;
                        $message = 'Отправлено успешно';
                    } else {
                        $result  = false;
                        $message = $response["errorMessage"];
                    }

                    break;
                default:
                    $result  = false;
                    $message = 'Ошибка в работе сервиса';
                    break;
            }
        } else {
            $result  = false;
            $message = 'Ошибка curl: '.curl_error($ch);
        }
        if ($ch) {
            curl_close($ch);
        }

        $eventCode = !empty($dataReq['event_code']) ? $dataReq['event_code'] : 'unknown';

        $this->sendLog(((!$result && $attemptNumber > $this->ispkConf->get('connstring/limit', 5)) ? "Достигнут лимит попыток. " : "").$message, array(
            'sso' => $dataReq['data']['sso'] ?? null,
            'corp' => $dataReq['data']['corp'] ?? null,
            'event_code' => $eventCode,
            'error' => 0,
            'action' => 'email_sent',
            'to' => $dataReq['to'] ?? null,
            'TaskNumber' => $taskNumber,
            'message_id' => $extId,
            'attemptNumber' => $attemptNumber,
            'url' => $this->ispkConf->get("connstring/send"),
            'errorMessage' => $message,
            'request' => $dataReq,
            'response' => $response));

        return array($result, $message);
    }

    private function _convertMessage($message, $params = array()) {
        //!!!!!!!!Если необходимо отправить в тексте письма картинку (ИЛИ НЕСКОЛЬКО) НЕОБХОДИМО в начале текста письма
        //!!!!!!!!добавить <img> тогда <img> будет убит кодом ниже, а ваши картинки будут жить.
        //Проверяем есть ли в тексте сообщения картинка, и предполагая что - это шапка удаляем её.
        $pos1_img = strpos($message, '<img');
        if ($pos1_img) {
            //			print_r(htmlspecialchars($message));
            $pos2_img   = strpos($message, '>', $pos1_img);
            $str1_kusok = substr($message, 0, $pos1_img);
            $str2_kusok = substr($message, $pos2_img + 1);
            $message    = $str1_kusok.$str2_kusok;
            //Проверяем, была ли наша картинка завернута в div, если да и div пустой - удаляем див!
            $pos1_div   = strpos($message, '<div');
            $pos2_div   = strpos($message, '>', $pos1_div);
            $pos3_div   = strpos($message, '</div>', $pos2_div);
            if (($pos1_div && $pos2_div && $pos3_div) || ($pos1_div === 0 && $pos2_div && $pos3_div)) {
                $str_pusto = substr($message, $pos2_div + 1, $pos3_div - $pos2_div - 1);
                if (trim($str_pusto) == '') {
                    $str1_div = substr($message, 0, $pos1_div);
                    $str2_div = substr($message, $pos3_div + 6);
                    $message  = $str1_div.$str2_div;
                }
                $message = trim($message);
                //Если после div шли br, удаляем br------------------------------------------------------
                while ((substr($message, 0, 4) == '<br>') || (substr($message, 0, 5) == '</br>') || (substr($message, 0, 5) == '<br/>')) {
                    if (substr($message, 0, 4) == '<br>') {
                        $message = trim(substr($message, 4));
                    }
                    if (substr($message, 0, 5) == '</br>') {
                        $message = trim(substr($message, 5));
                    }
                    if (substr($message, 0, 5) == '<br/>') {
                        $message = trim(substr($message, 5));
                    }
                }
            }
        }
        //Ищем футер в тексте письма, удаляем его и добавляем наш
        $mas_boti1  = strpos(htmlspecialchars($message), htmlspecialchars('С уважением,<br>Служба поддержки пользователей'));
        $mas_boti2  = strpos($message, '<font color="lightgray">--<br/>'); //Такая бредовая конструкция нужна
        $mas_boti22 = strpos($message, 'С уважением,');                   // из-за глюков strpos с кодировкой UTF-8
        if ($mas_boti1) {
            $message = substr(htmlspecialchars($message), 0, $mas_boti1);
            $message = htmlspecialchars_decode($message);
        } elseif ($mas_boti2 && $mas_boti22 && (($mas_boti22 - $mas_boti2) < 35)) {
            $message = substr($message, 0, $mas_boti2);
        }
        $message = trim($message);
        //Если перед ботинками шли br, удаляем br------------------------------------------------------
        while ((substr($message, -4) == '<br>') || (substr($message, -5) == '</br>') || (substr($message, -5) == '<br/>')) {
            if (substr($message, -4) == '<br>') {
                $message = trim(substr($message, 0, -4));
            }
            if (substr($message, -5) == '</br>') {
                $message = trim(substr($message, 0, -5));
            }
            if (substr($message, -5) == '<br/>') {
                $message = trim(substr($message, 0, -5));
            }
        }


        $wrapWithHtmlTag = true;
        if (is_array($params) && ! empty($params['dontWrapWithHtmlTag'])) {
            $wrapWithHtmlTag = false;
        }
        if ($wrapWithHtmlTag) {
            $message = (strpos($message, '<html>') === false ? '<html>' : '') . $message . '</html>';
        }

        return $message;
    }

    public function sendLog($message, $data = array())
    {
        app()['log']->info($message, $data);
    }

    public function info($message, $data) {
        app()['log']->info($message, $data);
    }

    public function critical($message, $data) {
        app()['log']->error($message, $data);
    }

    /**
     * @return array
     */
    protected function getExtLogData()
    {
        return array(
            'controller' => 'ISPK',
            'pid' => posix_getpid(),
            'sess-id' => session_id(),
            'ServerName' => $_SERVER['SERVER_NAME'] ?? php_uname('n'),
            'server-time' => microtime(true),
            'ip' => \lib::clientIP()
        );
    }
}