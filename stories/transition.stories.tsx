import * as React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import Transition from 'react-transition-group/Transition';
import SimpleModal from '../src';
import Toggler from './Toggler';

type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited';

interface TransitionProps {
  state: TransitionState;
}

const opacityMap = {
  entering: 0,
  entered: 1,
  exiting: 0,
  exited: 0,
};

const ContainerWithTransition = styled.div`
  position: fixed;
  top: 25%;
  right: 25%;
  left: 25%;
  bottom: 25%;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.4);
  transition: opacity 180ms;
  opacity: ${(props: TransitionProps) => opacityMap[props.state] || 0};
`;

storiesOf('SimpleModal', module).add('transition', () => (
  <Toggler>
    {({ show, toggle }) => (
      <Transition in={show} timeout={50} mountOnEnter unmountOnExit>
        {(state: TransitionState) => (
          <SimpleModal
            onRequestClose={toggle}
            appRoot={document.querySelector('#root') || document.body}
          >
            <ContainerWithTransition state={state}>
              <button onClick={toggle}>close</button>
            </ContainerWithTransition>
          </SimpleModal>
        )}
      </Transition>
    )}
  </Toggler>
));
