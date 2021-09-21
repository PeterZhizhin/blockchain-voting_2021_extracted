<?php

namespace App\Http\Controllers;

use App\Service;
use App\Component;
use App\Service\Config\PoolConfig;
use Cache;
use Illuminate\Http;

class Landing extends Controller {

    private Component\Election\Facade $_electionComponent;

    public function __construct(Http\Request $request, Http\Response $response) {
        parent::__construct($request, $response);
        $this->_electionComponent = Service\Locator::get(Component\Election\Facade::class);
        $this->_config = PoolConfig::me()->get('Mgik');
    }

    public function show() {
        $this->_assignVars();
        return $this->_renderView('application.election.landing.show');
    }

    protected function _assignVars(): void {
        $formName = env('FORM_LANDING_TITLE_TEXT', "Дистанционное электронное голосование на дополнительных выборах депутатов представительных органов местного самоуправления в муниципальных округах Бабушкинский и Марьино");
        $this->_addTemplateVar('form_name',  $formName);
        $formText = env('FORM_LANDING_TEXT', '<p class="poster__text">Если Вы постоянно зарегистрированы на территории избирательного округа №1 в Марьино или избирательного округа №1 в Бабушкинском районе и обладаете активным избирательным правом на день голосования, то Вы можете принять участие в дополнительных выборах в Советы депутатов муниципальных округов Марьино и Бабушкинский.</br>Для этого необходимо:</p><ul class="poster__list"><li>В период с 10:00 29.07.2020 по 20:00 7.09.2020 подать заявление на участие в дополнительных выборах в Советы депутатов муниципальных округов Марьино и Бабушкинский.</li><li>Дождаться получения подтверждающего статуса в Личном кабинете, на электронную почту или sms.</li><li>C 08:00 11.09.2020 до 20:00 12.09.2020 проголосовать за выбранных кандидатов. Вы можете выбрать не более двух кандидатов.</li></ul>');
        $this->_addTemplateVar('text',  $formText);
        $buttonText = null;
        foreach ($this->_electionComponent->getAllSettings() as $setting) {
            $buttonText = $setting->getLandingTemplateVars()->getButtonName();
            if ($buttonText) break;
        }
        $this->_addTemplateVar('buttonText',  $buttonText);
        $this->_addTemplateVar('formUrl', route('election'));
    }
}
