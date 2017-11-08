import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3'
import { GitService } from '../shared/git.service';

@Component({
  selector: 'git-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any[]
  images: any[]
  repos: any[]
  languages: any[]
  lineOfCode: any[]
  searching: boolean = false
  moved: boolean = false
  noLang: boolean = false
  svgTrue: boolean = false
  langName: any[]
  percentage: number
  totalArray: number = 0
  val: HTMLElement[]

  gitSuccess(userData) {
    this.users = userData
    this.searching = false
    this.getGitUserRepo(userData.repos_url)
  }

  gitReposSuccess(reposData) {
    this.repos = reposData
  }

  percentageCalc(total, perc) {
    total.forEach(val => { this.totalArray += val; return false })
    this.percentage = Math.round(perc / this.totalArray * 100)

  }

  gitLangSuccess(lanData) {

    if (!Object.keys(lanData).length) {
      this.noLang = true;
    }
    this.languages = Object.keys(lanData)
    this.lineOfCode = Object.values(lanData)
    let data = []
    this.languages.forEach((lanVal, lanInd) => {
      this.lineOfCode.forEach((perVal, perInd) => {
        let p = [];
        if (lanInd === perInd) {
          data.push({
            'langName': lanVal,
            'percentage': perVal,
            'color': this.applyColor()
          })
        }
      })
    })
    this.drawChart(data)
  }
  applyColor() {
    let color = '#'
    let decimal = '0123456789ABCDEF'
    for (let i = 0; i < 6; i++) {
      color += decimal[Math.round(Math.random() * 16)]
    }
    return color
  }

  drawChart(valy) {
    // this.svgTrue = true
    if (this.svgTrue) {
      let width = 450, height = 250, rO = 20, rI = 115;
      let svg = d3.select('.svgTag')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('class', 'chartPie')

      let group = svg.append('g')
        .attr('transform', `translate( 320, 130 )`)

      let arc = d3.arc()
        .innerRadius(rI)
        .outerRadius(rO)

      let pie = d3.pie()
        .value(function (d) {
          return d.percentage
        })

      let arcs = group.selectAll('.arc')
        .data(pie(valy))
        .enter()
        .append('g')
        .attr('class', 'arc')

      arcs.append('path')
        .attr('d', arc)
        .style('fill', function (d, i) {
          return d.data.color
        })
        .on('mousemove', (data) => {
          let toolTip = d3.select('.tooltip')
          let event = d3.event
          toolTip.style('left', (event.layerX - 50) + 'px')
          toolTip.style('top', (event.layerY + 25) + 'px')
          let p = pie(valy)
          let arr = []
          p.forEach(val => {
            arr.push(val.data.percentage)
          });
          this.langName = data.data.langName
          this.moved = true
          if (this.totalArray == 0) {
            this.percentageCalc(arr, data.data.percentage)
          } else {
            this.totalArray = 0
          }

        })
        .on('mouseout', () => {
          this.moved = false
        })
    }
  }

  gitFail(error) {
    this.searching = false
    throw error
  }
  makeFalse() {
    this.svgTrue = false; this.noLang = false
  }
  constructor(private _GitService: GitService) { }

  searchUsers(q: string) {
    this.searching = true
    this.svgTrue = false
    return this._GitService.getGitUser(q).subscribe(
      data => { this.gitSuccess(data); },
      error => this.gitFail(error),
      () => { console.log('**--'); }
    )
  }
  getGitUserRepo(q: string) {
    return this._GitService.getGitUserRepo(q).subscribe(
      data => { this.gitReposSuccess(data); /*console.log(data)*/ },
      error => this.gitFail(error),
      () => {/*console.log('Repos Completed...')*/ }
    )
  }

  getGitUserRepoLang(q: string) {
    this.svgTrue = true
    return this._GitService.getGitLan(q).subscribe(
      data => this.gitLangSuccess(data)
    )
  }

  ngOnInit() {
    console.log('🍺')
  }

}
