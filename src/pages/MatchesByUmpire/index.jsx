import React from 'react'
import {useAsync} from "../../hooks/useAsync"
import { getMatchesByUmpire } from '../../services/match'
import MatchCard from '../../components/MatchCard'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/Error/ErrorMessage'

export default function MatchesByUmpire() {
    const {umpireId} = useParams()
    const {loading, error, value: matches} = useAsync(() => getMatchesByUmpire({umpireId}), [umpireId])

    if(loading) {
        return <Loading/>
    }
    if(error) {
        return <ErrorMessage error={error}/>
    }
  return (
    <div className='matches-by-umpire'>
        <h1>Matches created by you</h1>
        <div className="matches">
            {matches.map(match => <MatchCard key={match._id} match={match}/>)}
        </div>
    </div>
  )
}
