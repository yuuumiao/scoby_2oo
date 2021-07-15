import React from "react";
import AppMap from "../components/AppMap";
import ItemDisplay from "../components/Items/ItemDisplay";
import UserContext from "../components/Auth/UserContext";
import FormItem from "../components/Items/FormItem";
import apiHandler from "../api/apiHandler";

class Home extends React.Component {
  static contextType = UserContext;
  state = {
    selectedItem: null,
    items: [],
  };

  componentDidMount() {
    apiHandler.getItems().then((data) => {
      this.setState({ items: data });
    });
  }

  addItem = (item) => {
    // console.log("item", item);
    this.setState({ items: [...this.state.items, item] });
  };

  onSelectItem = (selectedItem) => {
    // console.log(selectedItem);
    this.setState({ selectedItem: selectedItem });
  };

  handleClose = () => {
    this.setState({ selectedItem: null });
  };

  render() {
    const { user } = this.context;

    return (
      <div>
        {user && this.props.displayForm && (
          <FormItem
            type="fromHome"
            handleClose={this.props.handleClose}
            addItem={this.addItem}
          />
        )}
        {this.state.selectedItem !== null && (
          <ItemDisplay
            item={this.state.selectedItem}
            handleClose={this.handleClose}
          />
        )}
        <AppMap items={this.state.items} handleSelectItem={this.onSelectItem} />
      </div>
    );
  }
}

export default Home;
