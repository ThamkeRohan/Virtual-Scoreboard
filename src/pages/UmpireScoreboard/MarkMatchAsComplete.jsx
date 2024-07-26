import React from 'react'
import { markMatchAsCompleted } from '../../services/match'
import {useAsyncFn} from "../../hooks/useAsync"
import {useNavigate, useParams} from "react-router-dom"
import { useAuth } from '../../contexts/AuthContext'

export default function MarkMatchAsComplete({disconnectSocketOnError}) {
    const {umpire} = useAuth()
    const {matchId} = useParams()
    const markMatchAsCompletedFn = useAsyncFn(() => markMatchAsCompleted({matchId}))
    const navigate = useNavigate()

    function handleMatchCompleted() {
        markMatchAsCompletedFn.execute()
        .then(() => navigate(`/matches/umpires/${umpire._id}`))
        .catch(error => disconnectSocketOnError(error))
    }
  return (
    <div>
      <p>Is match finished?</p>
      <button type='button' onClick={handleMatchCompleted}>Yes</button>
    </div>
  )
}
