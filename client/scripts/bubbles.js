d3.select('svg').data([{roomname:'', numMsgs: 4},{roomname:'', numMsgs: 4}]).enter().append('circle').attr('text', function(d){
  return d.roomane;
})


