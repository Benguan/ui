
neg.cast = function (toBeTransfered) {
    var res = null;
    var typeStr = typeof (toBeTransfered);

    //switch (typeStr) {
    //    case "string":
    //        res = new internalClass.String(toBeTransfered);
    //        break;

    //    case "number":
    //        break;

    //    case "boolean":
    //        break;

    //    case "object":
    //        if (toBeTransfered instanceof String) {
    //            res = new internalClass.String(toBeTransfered.toString());
    //        }
    //        else if (toBeTransfered instanceof Array) {
    //            res = new internalClass.Array(toBeTransfered);
    //        }

    //        break;

    //    case "undefined":
    //    default:
    //}

    if (typeStr == "string") {
        return new internalClass._String(new String(toBeTransfered));
    }
    else if (typeStr == "object") {
        if (toBeTransfered instanceof String) {
            res = new internalClass._String(toBeTransfered);
        }
        else if (toBeTransfered instanceof internalClass._String.constructor) {
            return toBeTransfered;
        }
        else if (toBeTransfered instanceof Array) {
            res = new internalClass._Array(toBeTransfered);
        }
        else if (toBeTransfered instanceof internalClass._Array.constructor) {
            return toBeTransfered;
        }
    }
    return res;
};
