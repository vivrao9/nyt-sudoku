import React from 'react';
import * as d3 from 'd3'

// Copyright 2021, Observable Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/color-legend
function Legend({heatmap_scale, title}) {

  let tickSize = 6,
  width = 250, 
  height = 44 + tickSize,
  marginTop = 18,
  marginRight = 0,
  marginBottom = 16 + tickSize,
  marginLeft = 0,
  ticks = width / 64,
  tickFormat,
  tickValues;

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .style("overflow", "visible")
      .style("display", "block");

  let tickAdjust = g => g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height);
  let x;

  let thresholds = heatmap_scale.quantiles();
  thresholds = thresholds.map(d => Math.round(d, 0));

  const thresholdFormat
      = tickFormat === undefined ? d => d
      : typeof tickFormat === "string" ? d3.format(tickFormat)
      : tickFormat;

  x = d3.scaleLinear()
      .domain([-1, heatmap_scale.range().length - 1])
      .rangeRound([marginLeft, width - marginRight]);

  svg.append("g")
    .selectAll("rect")
    .data(heatmap_scale.range())
    .join("rect")
      .attr("x", (d, i) => x(i - 1))
      .attr("y", marginTop)
      .attr("width", (d, i) => x(i) - x(i - 1))
      .attr("height", height - marginTop - marginBottom)
      .attr("fill", d => d);

  tickValues = d3.range(thresholds.length);
  tickFormat = i => thresholdFormat(thresholds[i], i);

  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x)
        .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
        .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
        .tickSize(tickSize)
        .tickValues(tickValues))
      .call(tickAdjust)
      .call(g => g.select(".domain").remove())
      .call(g => g.append("text")
        .attr("x", marginLeft)
        .attr("y", marginTop + marginBottom - height - 6)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .attr("class", "title")
        .text(title));

  return svg.node();
}

export default Legend;