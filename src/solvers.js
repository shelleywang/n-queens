/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = new Board({n:n});
  var solutions = [];

  var recurseBoard = function(row){ 
      for (var i = 0; i<n;i++) {
        solution.togglePiece(row, i);

        if(solution.hasAnyRooksConflicts()){
          solution.togglePiece(row,i);
        } else if((row+1) < n) {
          return recurseBoard(row+1);
        } else if ((row+1) ===n) {
          var result = solution.rows();
          solution = new Board({n:n});
          return result;
        }
      }
  }
  return recurseBoard(0);

};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) { 
  //console.log('starting ' + n);
  var solution = new Board({n:n});
  var solutions = [];

  var recurseBoard = function(row,skip){ 
      for (var i = 0; i<n;i++) {
        var newskip = skip.slice();

        if (newskip.indexOf(i) === -1) {
          solution.togglePiece(row, i);

          if(solution.hasAnyRooksConflicts()){
            solution.togglePiece(row,i);
          } else if((row+1) < n) {
            newskip.push(i);
            recurseBoard(row+1,newskip);
            solution.togglePiece(row,i);
          } else if ((row+1) ===n) {
            solutions.push(solution.rows());
            solution.togglePiece(row,i);
          }
        }
      }
  }
  recurseBoard(0,[]);

  var solutionCount = solutions.length; 
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  console.log('STARTING ' +n)
  var solution = new Board({n:n});
  var solutions = [];

  if (n === 0) {
    return solution.rows();
  }

  var recurseBoard = function(row){
    
      for (var i = 0; i<n;i++) {   
        solution.togglePiece(row, i);

        if(solution.hasAnyQueensConflicts()){
          solution.togglePiece(row, i);
        } else if((row+1) < n) {
          recurseBoard(row+1);
          solution.togglePiece(row, i);
          
        } else if ((row+1) ===n) {
          solutions.push(solution.rows());
          solution = new Board({n:n});
        }
      }

  }

  recurseBoard(0);
  if (solutions[0]) {
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(solutions[0]));
    return solutions[0];
  } else {
    return solution.rows();
  }
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = new Board({n:n});
  var solutions = [];
  if (n === 0) {
    return 1;
  }
  var recurseBoard = function(row){
      for (var i = 0; i<n;i++) {
        solution.togglePiece(row, i);
        if(solution.hasAnyQueensConflicts()){
          solution.togglePiece(row, i);
        } else if((row+1) < n) {
          recurseBoard(row+1);
          solution.togglePiece(row, i);
        } else if ((row+1) ===n) {
          solutions.push(solution.rows());
          solution.togglePiece(row,i);
        }
      }
  }

  recurseBoard(0);

  var solutionCount = solutions.length; 
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


window.bitwiseCountNQueensSolutions = function(n) {
  var counter = 0;

  var all = (1<<n)-1; 

  var recurseBoard = function(col, ld, rd, all){
    var pos = ~(col | rd | ld) & all;

    while(pos>0){
        
      var bit = pos & -pos;
      pos = pos^bit;

      recurseBoard((col|bit), (ld|bit)<<1, (rd|bit)>>1, all);
    }

    if (col == all) {
      counter++;
    }
  }

  recurseBoard(0,0,0,all);

  return counter;
};
















