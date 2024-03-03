<!DOCTYPE html>
<html>
{include file="$template_path/_header.tpl"}
<body class="pgu pgu-container">

    <div class="row">
        <div class="col-md-12">

            <div class="form-result shadow-bottom">
                <h2>Спасибо, ваш голос учтен!</h2>

                {if $sid}
                    <p>Адрес вашей зашифрованной транзакции</p>
                    <div class="form-result__tx">{$sid}</div>

                    <p>
                        Вы можете сохранить этот адрес и при желании расшифровать его после подведения итогов голосования.
                    </p>

                    <a class="btn btn-primary form-result__btn" href="#" title="скопировать в буфер обмена">Скопировать</a>
                {/if}
            </div>

        </div>
    </div>

    <script>
        $(function() {

            $('.form-result__btn').on('click', function () {
                var value = $('.form-result__tx').text();
                var $temp = $("<input>");

                $("body").append($temp);
                $temp.val(value).select();
                document.execCommand("copy");
                $temp.remove();

                return false;
            });

        });
    </script>

</body>
</html>





