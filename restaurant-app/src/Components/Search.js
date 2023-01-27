import React, { Component } from "react";
import ListItem from "./ListItem";
import ListContainer from "./ListContainer";
import FavouriteButton from "./FavouriteButton";
import Form from "react-bootstrap/Form";

class Search extends Component {
	handleClick = (e) => {
		e.preventDefault();
		console.log("Handling search click...");
		const city = e.target.previousSibling.value;
		console.log("the city is....", city);
		this.setState({
			city: city,
		});

		const apiKey = process.env.REACT_APP_X_RapidAPI_Key;

		const options = {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": process.env.REACT_APP_X_RapidAPI_Key,
				// "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
				"X-RapidAPI-Host": "wyre-data.p.rapidapi.com",
			},
		};

		fetch(`https://wyre-data.p.rapidapi.com/restaurants/town/${city}`, options)
			.then((response) => response.json())
			.then((response) => {
				this.setState({
					isLoaded: true,
					restaurantData: response,
				});
				this.props.updateRestaurantData(response);
				console.log("the response is....", response);
			});
		this.props.updateIsLoaded(true);
	};

	render() {
		return (
			<>
				<Form>
					<Form.Group
						className="mb-4"
						controlId="exampleForm.ControlInput1">
						<Form.Label>Where are you dining out this weekend?</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter city here..."
						/>
					</Form.Group>
					<Form.Group
						className="mb-3"
						controlId="exampleForm.ControlTextarea1">
						<Form.Label>Example textarea</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
						/>
					</Form.Group>
				</Form>

				<form onSubmit={this.handleSubmit}>
					<label>Where are you dining out this weekend?</label>
					<input
						type="text"
						placeholder="Enter city here..."
						value={this.props.city}
						onChange={this.props.handleCityChange}
					/>
					<button
						onClick={(e) => this.handleClick(e)}
						type="submit">
						Search
					</button>
					<button onClick={this.clearList}>Clear</button>
				</form>
			</>
		);
	}
}

export default Search;
