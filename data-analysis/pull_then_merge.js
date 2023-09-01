import moment from 'moment';
import _ from 'lodash';

// write below the code that will pull the files from the SQL tables
// =================================================================

// format doks_performance date to match doks_easy format
doks_perf.date = moment(doks_perf.date).format('YYYY-MM-DD');

// format date column in doks_easy
doks_easy.date = moment(doks_easy.date).format('YYYY-MM-DD');

// convert all string of lists to lists
doks_perf.doks_order = _.map(doks_perf.doks_order, JSON.parse);
doks_perf.times = _.map(doks_perf.times, JSON.parse);

doks_easy.puzzle = _.map(doks_easy.puzzle, JSON.parse);
doks_easy.solution = _.map(doks_easy.solution, JSON.parse);

const merged = _.merge(doks_perf, doks_easy, (a, b) => {
if (_.isArray(a)) {
return a.concat(b);
}
});