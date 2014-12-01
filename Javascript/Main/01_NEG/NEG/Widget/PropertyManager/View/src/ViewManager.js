NEG.Module("NEG.Widget.PropertyManager.ViewManager", function (require) {
    //view model builder show be implement:
    //function:changeProperty
    //
    var defaultOption = {

    };

    var events = {
        //EventArguments：{resultInfo:[], propertyStatus:[{name:'PropertyName1',values:[{value:'PropertyValue1',valid:true},{value:'PropertyValue2',valid:false}]}],selectedProperty:[]}
        "BEFORE_PROPERTY_INIT": "Widget_PropertyManager_View_Before_Property_Init",
        //当propertyManager.View初始化时，触发
        "AFTER_PROPERTY_INIT": "Widget_PropertyManager_View_After_Property_Init",
        //当propertyManager.View changeProperty前，触发
        "BEFORE_PROPERTY_CHANGE": "Widget_PropertyManager_View_Before_Property_Change",
        //当propertyManager.View changeProperty后，触发
        "AFTER_PROPERTY_CHANGE": "Widget_PropertyManager_View_After_Property_Change"
    };

    var checkViewModel = function (viewModel) {
        return NEG.utility.isDefined(viewModel.init) && NEG.utility.isDefined(viewModel.changeProperty) && NEG.utility.isDefined(viewModel.getSelectedProperties);
    };

    var PropertyViewManager = function (config, option) {
        var instance = this;
        var model;
        var propertyNameViewModelMatch = {};


        this.changeProperty = function (target, isRefresh) {
            var selectedProperties = NEG.cast([]);
            if (isRefresh) {
                selectedProperties.addRange(target.getSelectedProperties());
            } else {
                for (var propertyName in propertyNameViewModelMatch) {
                    var temp = propertyNameViewModelMatch[propertyName].getSelectedProperties();
                    if (NEG.utility.isType(temp, undefined)) {
                        selectedProperties = NEG.cast([]);
                        break;
                    } else {
                        selectedProperties.addRange(temp);
                    }
                }
            }
            arguments = selectedProperties.source;
            model.changeProperty(arguments);
        };

        this.on = function (eventName, fn) {
            var eName = events[eventName];
            if (eName && fn) {
                NEG(instance).on(eName, fn);
            }
        };

        this.off = function (eventName, fn) {
            var eName = events[eventName];
            if (eName && fn) {
                NEG(instance).off(eName, fn);
            }
        };

        this.getDataModel = function () {
            return model;
        };


        var refreshViewModel = function (propertiesStatus) {
            for (var propertyName in propertyNameViewModelMatch) {
                var changeInfo = { selectedProperty: [], validValues: [], resultInfo: propertiesStatus.resultInfo };
                var selectedLen = propertiesStatus.selectedProperty.length;
                for (var i = 0; i < selectedLen; i++) {
                    var property = propertiesStatus.selectedProperty[i];
                    if (property.name == propertyName) {
                        changeInfo.selectedProperty.push(property);
                    }
                }
                var statusLen = propertiesStatus.propertyStatus.length;
                for (var i = 0; i < statusLen; i++) {
                    var property = propertiesStatus.propertyStatus[i];
                    if (property.name == propertyName) {
                        changeInfo.validValues.push(property.value);
                    }
                }
                propertyNameViewModelMatch[propertyName].changeProperty(changeInfo);
            }
        };
        //init
        this.init = function () {
            model = config.modelBuilder(config, option);
            model.on("BEFORE_PROPERTY_INIT", function (target, currentPropertyStatus) {
                NEG.cast(config.properties).each(function (item, i) {
                    item.viewModel.init(instance);
                    propertyNameViewModelMatch[item.name] = item.viewModel;
                });

                NEG(instance).trigger(events["BEFORE_PROPERTY_INIT"], currentPropertyStatus);
            });
            model.on("AFTER_PROPERTY_INIT", function (target, currentPropertyStatus) {
                refreshViewModel(currentPropertyStatus);
                NEG(instance).trigger(events["AFTER_PROPERTY_INIT"], currentPropertyStatus);
            });
            model.on("BEFORE_PROPERTY_CHANGE", function (target, currentPropertyStatus) {
                NEG(instance).trigger(events["BEFORE_PROPERTY_CHANGE"], currentPropertyStatus);
            });
            model.on("AFTER_PROPERTY_CHANGE", function (target, currentPropertyStatus) {
                refreshViewModel(currentPropertyStatus);
                NEG(instance).trigger(events["AFTER_PROPERTY_CHANGE"], currentPropertyStatus);
            });

            model.init(option.selectedProperties);
        };

    };


    //config.properties 代表property所管理的property
    //properties:[
    //              {name: 'size', value: ['big', 'medium', 'small'],viewModel:OBJECT,description:'Product Size'}，
    //              {name: 'color', value: ['yellow', 'red', 'green', 'blue'],viewModel:OBJECT},
    //              {name: 'volumn', value: ['16GB', '32GB', '64GB', '128GB'],viewModel:OBJECT,descrption:'Product Volume'}
    //           ]
    //availableMap:[{info:{item:111,suscription:6},map:[{name:'尺寸',value:'大'},{name:'颜色',value:'黄'},{name:'容量',value:'32GB'}，{name:'订阅',value:6}]},
    //              {info:{item:111,suscription:12},map:[{name:'尺寸',value:'大'},{name:'颜色',value:'黄'},{name:'容量',value:'32GB'}，{name:'订阅',value:12}]} 
    //              {info:{item:111,suscription:36},map:[{name:'尺寸',value:'大'},{name:'颜色',value:'黄'},{name:'容量',value:'32GB'}，{name:'订阅',value:36}]} 

    //              {info:{item:222,suscription:12},map:[{name:'尺寸',value:'中'},{name:'颜色',value:'蓝'},{name:'容量',value:'64GB'}，{name:'订阅',value:12}]]},
    //              {info:{item:333},map:[{name:'尺寸',value:'小'},{name:'颜色',value:'红'},{name:'容量',value:'16GB'}，{name:'订阅',value:36}]]},
    //              {info:{item:444},map:[{name:'尺寸',value:'大'},{name:'颜色',value:'绿'},{name:'容量',value:'16GB'}]}]
    var checkConfig = function (config) {
        var temp = NEG.utility.isDefined(config.modelBuilder) && NEG.utility.isDefined(config.properties) && config.properties.length > 0 &&
            NEG.utility.isDefined(config.availableMap) && config.availableMap.length > 0;

        NEG.cast(config.properties).each(function (item, i) {
            temp = temp && NEG.utility.isDefined(item.viewModel) && checkViewModel(item.viewModel);
        });
        return temp;
    };


    var propertyViewManagerBuilder = function (config, option) {
        var res = null;
        if (checkConfig(config)) {
            res = new PropertyViewManager(config, option);
        }
        return res;
    };

    return propertyViewManagerBuilder;
});