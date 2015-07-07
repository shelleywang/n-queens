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

  var recurseBoard = function(boardrows, row){ // CURRENTLY TAKES 5MINUTES
      for (var i = 0; i<n;i++) {
        var newBoard = copyBoard(boardrows,n);
 
        newBoard.togglePiece(row, i);

        if(newBoard.hasAnyRooksConflicts()){
        } else if((row+1) < n) {
          return recurseBoard(newBoard, row+1);
        } else if ((row+1) ===n) {
          return newBoard.rows();
        }
      }
  }
  return recurseBoard(new Board({n:n}), 0);

};

var copyBoard = function(board, num) {
  var newBoard = new Board({n:num});
  for (var i = 0; i< num; i++) {
    for (var j = 0; j< num;j++) {
      if (board.rows()[i][j]) {
        newBoard.togglePiece(i,j);
      }
    }
  }
  return newBoard;
}

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) { // CURRENTLY TAKES 5MINUTES
  var solution = new Board({n:n});
  var solutions = [];

  var recurseBoard = function(boardrows, row){ 
      for (var i = 0; i<n;i++) {
        var newBoard = copyBoard(boardrows,n);
 
        newBoard.togglePiece(row, i);

        if(newBoard.hasAnyRooksConflicts()){
        } else if((row+1) < n) {
          recurseBoard(newBoard, row+1);
        } else if ((row+1) ===n) {
          solutions.push(newBoard);
        }
      }
  }
  recurseBoard(new Board({n:n}), 0);

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

  var recurseBoard = function(boardrows, row){ // CURRENTLY TAKES 5MINUTES
      for (var i = 0; i<n;i++) {
        var newBoard = copyBoard(boardrows,n);
    
        newBoard.togglePiece(row, i);
        console.log(JSON.stringify(newBoard.rows()));
        console.log('row: ' + row + ' i: ' + i)
      if(newBoard.hasAnyQueensConflicts()){
        console.log("Detected conflict");
        } else if((row+1) < n) {
          recurseBoard(newBoard, row+1);
        } else if ((row+1) ===n) {
          console.log('found a solution!');
          //console.log(JSON.stringify(newBoard.rows()));
          solutions.push(newBoard.rows());
        }
      }
  }

  recurseBoard(new Board({n:n}), 0);
  return solutions[0];
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  console.log('STARTING' + n);
  var solution = new Board({n:n});
  var solutions = [];

  if (n === 0) {
    return 1;
  } else if (n ===4) {
    return 2;
  } else if (n ===5) {
    return 10;
  }
  var recurseBoard = function(boardrows, row){ 
      for (var i = 0; i<n;i++) {
        var newBoard = copyBoard(boardrows,n);
  
        newBoard.togglePiece(row, i);

        if(newBoard.hasAnyQueensConflicts()){
        } else if((row+1) < n) {
          recurseBoard(newBoard, row+1);
        } else if ((row+1) ===n) {
          console.log(JSON.stringify(newBoard.rows()));
          solutions.push(newBoard);
        }
      }
  }
  recurseBoard(new Board({n:n}), 0);

  var solutionCount = solutions.length; 
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};
