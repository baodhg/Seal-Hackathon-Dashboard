import React from 'react'
import { useRoutes } from 'react-router-dom'
import MainTemplate from '../template/MainTemplate/MainTemplate'
import { path } from '../common/path'
import PageNotFound from '../components/PageNotFound/PageNotFound'
import HomePage from '../pages/HomePage'

const useRootesCoustom = () => {
    const routes = useRoutes([
        {
            path: path.main,
            element: <HomePage />
        },
        {
            path: path.pageNotFound,
            element: <PageNotFound />,

        }
    ])
    return routes
}

export default useRootesCoustom
