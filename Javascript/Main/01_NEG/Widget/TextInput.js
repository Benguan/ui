NEG.Module('Widget.TextInput',function(require){
    var TextInput = function(target,option){

        var $ = window.jQuery;
        var input = $('target');
        input.val(_option.placeHolderText);
        input.addClass(_option.placeHolderClass);

        input.blur(function(){
            /\w+/.test(input.val()) || input.val(_option.placeHolderText);
        });

        input.focus(function(){
            if(input.val() === _option.placeHolderText){
                input.val('');
            }
        });

        //增加语音识别
        _option.speech && input.attr('x-webkit-speech','x-webkit-speech');

        //input.bind('speechchange',function(event){event.target.form.submit();});
        input.bind('speechchange',function(event){
            _option.speechChangeCallBack && _option.speechChangeCallBack()
        });

        //自动补全
        if(_option.suggestion){
            $.getJSON(_option.suggestionURL,function(){
                
            })
        }

        //类型校验（兼容HTML5）
    };
    return TextInput;
});