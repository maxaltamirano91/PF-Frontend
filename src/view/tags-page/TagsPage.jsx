import styles from './TagsPage.module.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProjects } from '../../redux/actions'

const TagsPage = () => {
    const dispatch = useDispatch()
    const { allProjects } = useSelector(state => state.projects)
}