function assert(check, message){
    console.log((check ? 'GREEN: ' : 'RED: ' ) + message);
}

function runtests(){

    $('#canvas a').removeClass('alive');
    $('#canvas a:first').addClass('alive');
    var a_first = $('#canvas a:first');
    assert(gol.isCellAlive(a_first), 'cell should be alive');

    assert(gol.livingNeighbours(a_first) === 0, 'living neighbours should be 0');

    a_first.next('a').addClass('alive');

    assert(gol.livingNeighbours(a_first) == 1, 'living neighbours should be 1');

    a_first.next('a').next('a').addClass('alive');

    assert(gol.getPosition(a_first)[0] === 0, 'row for [0,0]should be 0');
    assert(gol.getPosition(a_first.next('a'))[1] === 1, 'col for [0,1] should be 1');

    assert(gol.getByPosition([0, 1]).size() == 1, 'get by position should return one');

    assert( gol.isCellAlive(gol.getByPosition([0, 1])), 'cell [0,1] should be alive');

    assert(gol.getSiblings( a_first ).size() == 3, 'get all siblings');


    gol.getByPosition([3, 1]).addClass('alive');
    assert(gol.livingNeighbours(a_first) === 1, 'living neighbours should still be 1');

    assert(gol.nextState(a_first) == 'dead', 'shoud apply the first rule');



    gol.getByPosition([2, 0]).addClass('alive');
    gol.getByPosition([2, 1]).addClass('alive');
    gol.getByPosition([2, 2]).addClass('alive');
    gol.getByPosition([3, 0]).addClass('alive');

    assert(gol.nextState(gol.getByPosition([3, 1])) == 'dead', 'shoud apply the third rule');

    assert(gol.nextState(gol.getByPosition([3, 2])) == 'alive', 'shoud apply the fourth rule');
    assert(gol.nextState(gol.getByPosition([3, 0])) == 'alive', 'shoud apply the fourth rule');


};
