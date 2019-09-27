import React, { useState } from 'react'
import { connect } from 'react-redux'


const SpacePage = props => {
  
};

const mapStateToProps = state => {
  return {
    space: state.space
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpacePage)