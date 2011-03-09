

$(function(){
   $('#canvas a').live('click', function(){
        $(this).toggleClass('alive');
        return false;
    });

   $('#go').click(function(){
        gol[gol.interval ? 'stop' : 'start']();
        $(this).text(gol.interval ? 'Stop' : 'Start');
        return false;
    });

    gol.init();
    runtests();
});



var gol = {

    rows: 10,
    cols: 20,

    init: function(){
        var one_cell = Math.floor($('#canvas').width() / gol.cols) -1;
        for(var l = gol.rows * gol.cols, i = 0; i < l; i++){
            $('<a />', {
                css: {
                    'width': one_cell, 'height': one_cell
                }
            }).appendTo('#canvas');
        };


        $('#canvas a').each(function(){
            $(this).data('gol_siblings', gol.getSiblings($(this)));
            var pos = gol.getPosition($(this));

            $(this).attr('id', 'pos-' + pos[0] + '-' + pos[1]);
        });

    },

    start: function(){
        gol.tick();
    },

    stop: function(){
        clearTimeout(gol.interval);
        gol.interval = null;
    },

    tick: function(){
        gol.prepareNextState();
        gol.applyNextState();
        gol.interval = setTimeout(gol.tick, 200);
    },

    isCellAlive : function(cell){
        return cell.hasClass('alive');
    },

    getPosition: function(cell){
        var pos = $(cell).data('post');
        if(pos)
            return pos;
        var canvas = $('#canvas'),
            canvas_offset = canvas.offset(),
            cell_offset = cell.offset()||{},
            w = canvas.width() / gol.cols,
            h = canvas.height() /  gol.rows;
        position = [Math.floor((cell_offset.top -  canvas_offset.top) / h  ),
                    Math.floor((cell_offset.left - canvas_offset.left) / w)];
        $(cell).data('pos', position);
        return position;

    },

    getByPosition: function(position){
        var found = $('#pos-' + position[0] + '-' + position[1]),
            pos = null;
        if(found)
            return found;

        found = $('#canvas a').eq(position[0] * gol.cols + position[1]);
        pos = gol.getPosition(found);
        return (pos[1] == position[1] && pos[0] == position[0])? found : null;
    },
    getSiblings: function(cell){

        if($(this).data('gol_siblings'))
            return $(this).data('gol_siblings');

        var position = this.getPosition(cell);
        return $(    this.getByPosition([position[0] -1,  position[1] - 1]))
                .add(this.getByPosition([position[0] -1,  position[1]]    ))
                .add(this.getByPosition([position[0] -1,  position[1] + 1]))
                .add(this.getByPosition([position[0],     position[1] - 1]))
                .add(this.getByPosition([position[0],     position[1] + 1]))
                .add(this.getByPosition([position[0] + 1, position[1] - 1]))
                .add(this.getByPosition([position[0] + 1, position[1]]    ))
                .add(this.getByPosition([position[0] + 1, position[1] + 1]));

    },

    livingNeighbours : function(cell){
        return gol.getSiblings(cell).filter('.alive').size();
    },

    nextState: function(cell){
        var livingNeighbours = this.livingNeighbours(cell);
        return (( livingNeighbours == 2 || livingNeighbours == 3 ) && gol.isCellAlive(cell))
                || (livingNeighbours == 3 && !gol.isCellAlive(cell)) ? 'alive' : 'dead';
    },

    prepareNextState: function(){

        $('#canvas a').each(function(){
            $(this).data('nextState', gol.nextState($(this)));
        });

    },

    applyNextState: function(){
        $('#canvas a').removeAttr('class').addClass(function(){return $(this).data('nextState')});
    }

}
