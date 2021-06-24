import routs from "../config/routs.mjs";

function getParamNames(func) {
  let fnStr = func.toString().replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '');
  let result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(/([^\s,]+)/g);
  return (result === null) ? [] : result;
}

export default {

  /**
   * Вернуть API
   * @returns {string[]}
   */
  getListCmd() {
    return Object.keys(routs)
  },


  /**
   * Вернуть параметры функции   todo и хотелось бы описание jsdoc
   * @param cmd {string} название команды
   * @returns {[]|RegExpMatchArray}
   */
  getParamsCmd(cmd) {
    let action = routs[cmd]
    if (action) {
      return getParamNames(action)
    } else {
      throw Error('Нет такой команты ' + cmd)
    }
  },


}
