import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit  {

  private data = [
    {
     "ALLOCATIONID": 1,
     "SEATSTARTID": 1,
     "SEATENDID": 650,
     "MANAGERID": 1,
     "COUNT": 650
    },
    {
     "ALLOCATIONID": 2,
     "SEATSTARTID": 1,
     "SEATENDID": 130,
     "MANAGERID": 2,
     "COUNT": 130
    },
    {
     "ALLOCATIONID": 3,
     "SEATSTARTID": 131,
     "SEATENDID": 260,
     "MANAGERID": 3,
     "COUNT": 130
    },
    {
     "ALLOCATIONID": 4,
     "SEATSTARTID": 261,
     "SEATENDID": 390,
     "MANAGERID": 4,
     "COUNT": 130
    },
    {
     "ALLOCATIONID": 5,
     "SEATSTARTID": 391,
     "SEATENDID": 520,
     "MANAGERID": 5,
     "COUNT": 130
    },
    {
     "ALLOCATIONID": 6,
     "SEATSTARTID": 521,
     "SEATENDID": 650,
     "MANAGERID": 6,
     "COUNT": 130
    },
    {
     "ALLOCATIONID": 7,
     "SEATSTARTID": 1,
     "SEATENDID": 65,
     "MANAGERID": 7,
     "COUNT": 65
    },
    {
     "ALLOCATIONID": 8,
     "SEATSTARTID": 66,
     "SEATENDID": 130,
     "MANAGERID": 8,
     "COUNT": 65
    },
    {
     "ALLOCATIONID": 9,
     "SEATSTARTID": 131,
     "SEATENDID": 195,
     "MANAGERID": 9,
     "COUNT": 65
    },
    {
     "ALLOCATIONID": 10,
     "SEATSTARTID": 166,
     "SEATENDID": 230,
     "MANAGERID": 10,
     "COUNT": 65
    },
    {
     "ALLOCATIONID": 11,
     "SEATSTARTID": 231,
     "SEATENDID": 295,
     "MANAGERID": 11,
     "COUNT": 65
    },
    {
     "ALLOCATIONID": 12,
     "SEATSTARTID": 296,
     "SEATENDID": 360,
     "MANAGERID": 12,
     "COUNT": 65
    },
    {
     "ALLOCATIONID": 13,
     "SEATSTARTID": 361,
     "SEATENDID": 425,
     "MANAGERID": 13,
     "COUNT": 65
    },
    {
     "ALLOCATIONID": 14,
     "SEATSTARTID": 426,
     "SEATENDID": 490,
     "MANAGERID": 14,
     "COUNT": 65
    },
    {
     "ALLOCATIONID": 15,
     "SEATSTARTID": 491,
     "SEATENDID": 555,
     "MANAGERID": 15,
     "COUNT": 65
    },
    {
     "ALLOCATIONID": 16,
     "SEATSTARTID": 556,
     "SEATENDID": 620,
     "MANAGERID": 16,
     "COUNT": 65
    }
   ];
  private svg: any;
  private margin = 40;
  private width = 800;
  private height = 500;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors: any;


  constructor() {

  }

  ngOnInit(): void {
    this.createSvg();
    this.createColors();
    this.drawChart();
  }

  private createSvg(): void {
    this.svg = d3.select("div#pieManagersAllocations")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
}
private createColors(): void {
  this.colors = d3.scaleOrdinal()
  .domain(this.data.map(d => d.COUNT.toString()))
  //.range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
  .range(["#ffc0cb", "#ffc6d0", "#ffcdd5", "#ffd9e0", "#ffe6ea"]);
}

private drawChart(): void {
  // Compute the position of each group on the pie:
  const pie = d3.pie<any>().value((d: any) => Number(d.COUNT));

  // Build the pie chart
  this.svg
  .selectAll('pieces')
  .data(pie(this.data))
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(this.radius)
  )
  .attr('fill', (d : any, i: any) => (this.colors(i)))
  .attr("stroke", "#121926")
  .style("stroke-width", "1px");

  // Add labels
  const labelLocation = d3.arc()
  .innerRadius(100)
  .outerRadius(this.radius);

  this.svg
  .selectAll('pieces')
  .data(pie(this.data))
  .enter()
  .append('text')
  .text((d: any) => d.data.MANAGERID + " (" + d.data.COUNT + " )")
  .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
  .style("text-anchor", "middle")
  .style("font-size", 10);
}

}
