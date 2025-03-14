import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from "./HomePage.css";

import Entry from "../../Entry/Entry.js";
import EntrySortButtons from "../EntrySortOptions/EntrySortButtons.js"

class HomePage extends Component {
	constructor() {
		super();
		this.state = {
			content: [],
		}

		this.getEntryData = this.getEntryData.bind(this);
	}
	componentDidMount() {
		this.getEntryData(3);
	}
	getEntryData(numb) {
		let self = this;
		
		if (numb == 1) {
			var contentOrder = "most_popular"
		}
		else if (numb == 2) {
			var contentOrder = "most_viewed"
		}
		else if (numb == 3) {
			var contentOrder = "most_recent"
		}

		fetch("/api/" + contentOrder + "/").then(function(response) {
			var contentType = response.headers.get("content-type");
			if (contentType && contentType.includes("json")) {
				return response.json();
			}
			throw new TypeError("Error: Didn't receive JSON");
		}).then(function(json) {
			self.setState({
				content: json
			});
		}).catch(function(error) {
			console.log(error);
		});
	}
	render() {
		return(
			<div className={styles.page}>
				{console.log("Meow")}
				<EntrySortButtons changeEntryOrder={this.getEntryData}/>
				{this.state.content.map((item) => (
					<Link to={"/" + item.id} key={item.id} className={styles.link}>
						<Entry title={item.title} ranking={item.ranking} summary={item.summary} idval={item.id} />
					</Link>
				))}
			</div>
		);
	}
}

export default HomePage;
