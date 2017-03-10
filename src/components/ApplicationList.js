import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';


import { applicationGetAll } from '../actions';
import { Button, CardSection, Card } from './common';
import Application from './Application';


class ApplicationList extends Component {
  componentWillMount() {
    this.props.applicationGetAll(this.props.id);
  }

  renderApplications() {
    console.log('props: ', this.props);
    
    if (this.props.applications) {
      return this.props.applications.reverse().map(application =>
        
        <Application key={application.id} application={application} />
      );
    }
  }

  render() {
    console.log(this.props);
    return (
      <Card>
        <CardSection>
          <Button onPress={() => this.props.applicationGetAll(this.props.id)}>
            Refresh
          </Button>
          <Button onPress={() => this.props.applicationGetAll(this.props.id)}>
            Add App // Redirect to Actions.CreateApp()?
          </Button>
        </CardSection>
      
        <ScrollView>
          {this.renderApplications()}
        </ScrollView>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { email, id } = state.authenticationInformation.user;
  const { applications } = state.applicationForm;

  return { email, id, applications };
};

export default connect(mapStateToProps, { applicationGetAll })(ApplicationList);
//export default connect(mapStateToProps)(ApplicationList);
