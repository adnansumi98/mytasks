import "./index.css";
import { Component } from "react";

class VistCountries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countriesList: props.countriesList,
    };
  }

  handleVisit = (event) => {
    const id = event.target.value;
    this.setState((prevState) => ({
      countriesList: prevState.countriesList.map((country) =>
        country.id === id
          ? { ...country, isVisited: !country.isVisited }
          : country,
      ),
    }));
  };

  render() {
    const { countriesList } = this.state;
    const visitedCountriesList = countriesList.filter(
      (each) => each.isVisited === true,
    );

    return (
      <div className="main-container">
        <h1 className="main-heading">Countries</h1>
        <ul className="countries-list">
          {countriesList.map((each) => {
            const { id, name, isVisited } = each;
            return (
              <li key={id}>
                <p className="country-name">{name}</p>
                {isVisited ? (
                  <p>Visited</p>
                ) : (
                  <button type="button" onClick={this.handleVisit} value={id}>
                    Visit
                  </button>
                )}
              </li>
            );
          })}
        </ul>
        <h1 className="main-heading">Visited Countries</h1>
        <ul className="visited-list">
          {visitedCountriesList.length === 0 ? (
            <p>No Countries Visited Yet</p>
          ) : (
            visitedCountriesList.map((each) => {
              const { id, imageUrl, name } = each;
              return (
                <li key={id} value={name}>
                  <img src={imageUrl} alt="thumbnail" />
                  <p>{name}</p>
                  <button type="button" onClick={this.handleVisit} value={id}>
                    Remove
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>
    );
  }
}

export default VistCountries;
