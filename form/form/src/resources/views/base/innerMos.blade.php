<!DOCTYPE html>
<html lang="ru">
    <head>
        @include('base.template.templateJsAndCssMos')
    </head>

    <body class="d-flex flex-column min-vh-100">

        {!! $content !!}

        <footer class="footer mt-auto">
            <div class="mos-container">
                Дистанционное электронное голосование<br>
                <a href="mailto:support-vybory@mos.ru" class="text-dark text-nowrap">support-vybory@mos.ru</a>, <span class="text-nowrap">+7 (495) 539-56-56</span>
            </div>
        </footer>

    </body>
</html>