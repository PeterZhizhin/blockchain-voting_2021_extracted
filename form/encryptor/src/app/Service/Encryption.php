<?php

namespace App\Service;

class Encryption {

    public function __construct() {
        $this->_armMgikLogger = app()['log']->channel('arm');
    }

    public function decryptRaw(string $data) {
        $string = base64_decode($data, true);
        if (empty($string)) {
            throw new \Exception("base64body unable to unpack: $data", 10);
        }

        $ivlen = openssl_cipher_iv_length($cipher="AES-128-CBC");
        $iv = substr($string, 0, $ivlen);
        $hmac = substr($string, $ivlen, $sha2len=32);
        $ciphertext_raw = substr($string, $ivlen+$sha2len);
        $key = $this->_secret();
        $plaintext = openssl_decrypt($ciphertext_raw, $cipher, $key, $options=OPENSSL_RAW_DATA, $iv);
        $calcmac = hash_hmac('sha256', $ciphertext_raw, $key, $as_binary=true);
        if (!is_string($calcmac)||!is_string($hmac)||!hash_equals($hmac, $calcmac))
        {
            throw new \Exception("Cipher error $hmac и  $calcmac", 10);
        }
        return $plaintext;
    }

    public function decrypt(array $data = []) {
        if (empty($data['base64body'])) {
            throw new \Exception('Field missing or empty: base64body', 3);
        }
        $data = $data['base64body'];
        $data = str_replace(' ','+',$data);
        return $this->decryptRaw($data);
    }

    public function crypt(string $string) {
        //посчитаем длину сдвига
        $ivlen = openssl_cipher_iv_length($cipher="AES-128-CBC");
        //сгенерим вектор
        $iv = openssl_random_pseudo_bytes($ivlen);
        $key = $this->_secret();
        $ciphertext_raw = openssl_encrypt($string, $cipher, $key, $options=OPENSSL_RAW_DATA, $iv);
        $hmac = hash_hmac('sha256', $ciphertext_raw, $key, $as_binary=true);
        $ciphertext = base64_encode( $iv.$hmac.$ciphertext_raw );

        return $ciphertext;
    }

    private function _secret(): string {
        return env('CRYPT_SECRET', 'secret');
    }
}