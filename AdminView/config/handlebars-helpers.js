module.exports = {
    inc:  function(value, options)
    {
        return parseInt(value) + 1;
    },
    countcat: function(value,inx,options){
        return parseInt(value[inx]);
    }
  }