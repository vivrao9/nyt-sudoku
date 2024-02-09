import { scaleLinear, max } from 'd3';

// Define x scale
export const xScale = function({ timesCleaned, margin, width}) {
    return scaleLinear()
        .domain([0, max(timesCleaned)])
        .range([margin.left, width - margin.right]);
};