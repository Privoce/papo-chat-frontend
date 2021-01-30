import React from 'react';

import PropTypes from 'prop-types';
import { Switch, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import {
  SignUpEntry,
  SignInEntry,
  ChatEntry,
  SocialAuthEntry,
  Page404,
  DirectCall,
} from 'entries';

import { AppContainer } from 'shared/containers';

import CustomRoute from './components/CustomRoute';

function RoutesContainer({ location }) {
  return (
    <AppContainer>
      <TransitionGroup className="transition-group-container">
        <CSSTransition
          key={location.key}
          timeout={{ enter: 300, exit: 200 }}
          classNames="fade"
        >
          <section className="route-section">
            <Switch location={location}>
              <CustomRoute
                exact
                path="/"
                component={ChatEntry}
                protectedRoute
              />
              <CustomRoute exact path="/signin" component={SignInEntry} />
              <CustomRoute exact path="/signup" component={SignUpEntry} />
              <CustomRoute
                exact
                path="/social/:token"
                component={SocialAuthEntry}
              />

              <CustomRoute component={Page404} />
              <CustomRoute
                exact
                path="/direct-call/:user"
                component={DirectCall}
              />
              
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </AppContainer>
  );
}

RoutesContainer.propTypes = {
  location: PropTypes.shape({
    key: PropTypes.string,
  }).isRequired,
};

export default withRouter(RoutesContainer);
