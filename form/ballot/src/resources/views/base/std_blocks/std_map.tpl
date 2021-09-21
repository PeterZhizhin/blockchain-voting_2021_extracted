<script type="text/javascript">

var scripts = [
    'https://apieatlas.mos.ru/js/?key={$atlas_key}&version={$atlas_version}',
    '{$CFG_JS_HOST}/common/js_v3/base/atlas2.js'
];

function loadScripts(scripts) {
    
    if (typeof(jQuery) !== 'undefined') {

        var url = scripts.shift();
        var el = document.createElement('script');

        document.getElementsByTagName('head')[0].appendChild(el);

        el.onload = function (script) {
//            console.log(url + ' loaded!');
            if (scripts.length) {
                loadScripts(scripts);
            } else {
//                console.log('run app');
                if (typeof(waitJqueryLoadApieatlasCallback) !== 'undefined' && waitJqueryLoadApieatlasCallback.length) {
                    for (ii = 0; ii < waitJqueryLoadApieatlasCallback.length; ii++) {
                        if (typeof(waitJqueryLoadApieatlasCallback[ii]) === 'function') {
                            waitJqueryLoadApieatlasCallback[ii]();
                        }
                    }
                }
            }
        };

        el.src = url;
    } else {
        window.setTimeout(function () {
            loadScripts(scripts);
        }, 1000);
    }
}

loadScripts(scripts);

</script>