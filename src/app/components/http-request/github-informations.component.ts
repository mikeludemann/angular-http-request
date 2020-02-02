import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import axios from 'axios';

@Component({
	selector: 'github-informations',
	templateUrl: './github-informations.component.html',
	styleUrls: ['./github-informations.component.css']
})
export class GithubInformationsComponent implements OnInit {

	@Input() ngStyle: { [key: string]: string; }

	@Input() username: string;

	@ViewChild('httprequest') el: ElementRef;

	constructor() { }

	ngOnInit() {

		axios
		.get("https://api.github.com/users/" + this.username)
		.then(res => {

			const tableInfo = document.getElementById("main--table");
			const tableStatus = document.getElementById("status--table");

			var infos = "";
			var status = "";

			const dataObject = JSON.stringify(res.data, null);
			const dataJSON = JSON.parse(dataObject);

			infos += "<tr><th>Options</th><th>Information</th></tr>";

			for (var x in dataJSON) {
				infos += "<tr><td>" + x + "</td><td>" + dataJSON[x] + "</td></tr>";
			}

			tableInfo.innerHTML = infos;

			status += "<table><tr><th>Options</th><th>Information</th></tr><tr><td>Status</td><td>" + res.status + "</td></tr></table>";

			tableStatus.innerHTML = status;

		})
		.catch(error => {

			console.log(error);

		});

	}

	ngAfterViewInit() {

	}

}
