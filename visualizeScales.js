(function (){
  var notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
  var transpose = {
    seventh_b9: [0, 10, 1, 4, 7],
    ninth: [0, 2, 4, 7, 10],
    diminished: [0, 3, 6, 8],
    augmented: [0, 4, 9],
    sixth: [0, 4, 7, 9],
    major_7th: [0, 4, 7, 11],
    minor_7th: [0, 3, 7, 10],
    dominant_7th: [0, 4, 7, 10],
    minor: [0, 3, 7],
    major: [0, 4, 7]
  };
  var euk = {
    name: 'Ukulele',
    strings: 4,
    frets: 13,
    firstNote: [0, 7, 3, 10]
  };
  var guitar = {
    name: 'Guitar',
    strings: 6,
    frets: 13,
    firstNote: [7, 2, 10, 5, 0, 7]
  };
  var instruments = [euk, guitar];

  var Instrument = function(options) {
    this.name = options.name;
    this.tuning = options.tuning;
    this.strings = options.strings;
    this.frets = options.frets;
    this.notes = options.notes;
  };

  var showMeTheNotes = function() {
    clearNotes();
    var tuning = document.getElementById('tuning').value;
    var scale = document.getElementById('scale').value;
    var totalNotes = document.getElementsByClassName('note');
    for(var n = 0; n < transpose[scale].length; n++) {
        var offset = transpose[scale][n] + parseInt(tuning, 10);
      for(var i = 0; i < totalNotes.length; i++) {
        var actual = (offset < notes.length) ? offset : offset - notes.length;
        var classNote = totalNotes[i].className.split(' ');
        if(classNote[0] == actual) {
          totalNotes[i].style.backgroundColor = 'red';
        }
      }
    }
  };

  var clearNotes = function() {
    var totalNotes = document.getElementById('fret-table').getElementsByTagName('td');
    for(var i = 0; i < totalNotes.length; i++) {
      totalNotes[i].style.backgroundColor = 'white';
    }
  };

  function createTable(instrument) {
    var fret = document.getElementById('fret-board');
    fret.innerHTML = '';
    var tbl = document.createElement('table');
    tbl.id = 'fret-table';
    tbl.setAttribute('border-collapse', 'collapse');
    tbl.style.align = 'center';
    tbl.style.display = 'inline-table';

    var tbdy = document.createElement('tbody');

    //Rows 
    for(var row = -1; row < instrument.strings; row++) {
      var tr = document.createElement('tr');
      if (row > -1) {
      }

      //Comumns
      for(var col = 0; col < instrument.frets; col++) {
        var td = document.createElement('td');

        //Logic of Fret Style
        if (row < 0) {
          if (col === 0) {
            td.innerHTML = 'nut';
          } else {
            td.innerHTML = col;
          }
        } else {
          var offset = col + instrument.firstNote[row];
          var note = (offset < notes.length) ? offset : offset - notes.length;
          td.className = note + ' note';
          td.innerHTML = notes[note];
          td.style.border = 'solid thin';
        }
        td.style.padding = '5px 10px 5px 10px';
        tr.appendChild(td);
      }
      tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    fret.appendChild(tbl);
  }

  function buildApp(type) {
    //Fret-Board
    var app = document.getElementById('music-trainer');
    var fret = document.createElement('div');
    fret.id = 'fret-board';
    var options = document.createElement('div');
    options.id = 'app-options';
    app.appendChild(fret);
    app.appendChild(options);

    //Tuning Select
    var tuning = document.createElement('select');
    tuning.id = 'tuning';
    for(var i = notes.length - 1; i >= 0; i--) {
      var note = document.createElement('option');
      note.value = i;
      note.text = notes[i];
      tuning.add(note, 0);
    }
    tuning.addEventListener('change', showMeTheNotes);

    //Scale Select
    var scale = document.createElement('select');
    scale.id = 'scale';
    for(var key in transpose) {
      var option = document.createElement('option');
      option.value = option.text = key;
      scale.add(option, 0);
    }
    scale.addEventListener('change', showMeTheNotes);

    //Instrument Select
    var instrument = document.createElement('select');
    instrument.id = 'instrument';
    for(var q = 0; q < instruments.length; q++) {
      var ins = document.createElement('option');
      ins.value = q;
      ins.text = instruments[q].name;
      instrument.add(ins);
    }
    instrument.addEventListener('change', function(){
      var listen = document.getElementById('instrument');
      createTable(instruments[listen.value]);
    });

    //Clear Button
    var exec = document.createElement('button');
    exec.innerHTML = 'Clear Notes';
    exec.addEventListener('click', clearNotes);
    
    //Add Options to Window
    options.appendChild(tuning);
    options.appendChild(scale);
    options.appendChild(instrument);
    options.appendChild(exec);

    //Create Table for Instrument
    createTable(type);
  }

  buildApp(euk);
})();