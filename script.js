$.ajax({
  url: 'modssmu.min.json',
  success: function(data) {

    $('#mods-table').dynatable({
      dataset: {
        records: data.records
      },
      table: {
        defaultColumnIdStyle: 'trimDash'
      },
      features: {
        search: false
      }
    });

  }
});

function filterData(name, record, value) {
  str = value.replace(/\s+/g, '');
  numIndex = str.search(/[0-9]/);
  num = str.substr(numIndex);

  if (str.match(/^>=\s*\d/)) {
    console.log('filter ' + name + ' greater than or equal to ' + num)
    return record[name] >= num;
  } else if (str.match(/^<=\s*\d/)) {
    console.log('filter ' + name + ' less than or equal to ' + num)
    return record[name] <= num;
  } else if (str.match(/^>\s*\d/)) {
    console.log('filter ' + name + ' greater than ' + num)
    return record[name] > num;
  } else if (str.match(/^<\s*\d/)) {
    console.log('filter ' + name + ' less than ' + num)
    return record[name] < num;
  } else if (num) {
    console.log('filter ' + name + ' equal to ' + num)
    return record[name] == num;
  }
}

var dynatable = $('#mods-table')
  .bind('dynatable:init', function(e, dynatable) {
    dynatable.queries.functions['filter-1'] = function(record, queryValue) {
      return filterData('A', record, queryValue);
    };
    dynatable.queries.functions['filter-2'] = function(record, queryValue) {
      return filterData('A-', record, queryValue);
    };
    dynatable.queries.functions['filter-3'] = function(record, queryValue) {
      return filterData('B+', record, queryValue);
    };
    dynatable.queries.functions['filter-4'] = function(record, queryValue) {
      return filterData('B', record, queryValue);
    };
    dynatable.queries.functions['filter-5'] = function(record, queryValue) {
      return filterData('B-', record, queryValue);
    };
    dynatable.queries.functions['filter-6'] = function(record, queryValue) {
      return filterData('C+', record, queryValue);
    };
    dynatable.queries.functions['filter-7'] = function(record, queryValue) {
      return filterData('C', record, queryValue);
    };
    dynatable.queries.functions['filter-8'] = function(record, queryValue) {
      return filterData('C-', record, queryValue);
    };
    dynatable.queries.functions['filter-9'] = function(record, queryValue) {
      return filterData('CGPA', record, queryValue);
    };
  })
  .dynatable({
    dataset: dataMods,
    table: {
      defaultColumnIdStyle: 'trimDash'
    },
    features: {
      search: false,
      pushState: false
    },
    inputs: {
      queries: $('#filter-1, #filter-2, #filter-3, #filter-4, #filter-5, #filter-6, #filter-7, #filter-8, #filter-9')
    }
  }).data('dynatable');
