/* 
* 面向对象的编程：有固定的结构，类是自下而上的继承; 
* 面向对象的编程最大的问题是：事先定义好的结构会影响代码的扩展性;
*/
function Container(val){
    this._value = val;
    this.init(val);
    }
    Container.prototype.init = _.identity;
    
    var c = new Container(10);
    
    var HoleMixin = {
    setValue: function(value){
      var old 
    }
}