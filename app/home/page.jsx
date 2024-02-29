import React from 'react'

import HomeComponent from '../components/Home'

import { withPageAuthRequired } from '@auth0/nextjs-auth0';

function page() {
  return (
    <HomeComponent/>
  )
}

export default withPageAuthRequired(page);