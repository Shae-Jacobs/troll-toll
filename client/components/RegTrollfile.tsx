import { useEffect, useState } from 'react'
import { useBridges } from '../hooks/useBridge'
import { useFavourites } from '../hooks/useFavourite'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import Status from './Status'
import { Bridge } from '../../models/bridge'
import RegFavouritesCard from './RegFavouritesCard'

type FormState =
  | {
      activeBridge: Bridge | null | undefined
      usersToken: string
      usersName: string | null
    }
  | {
      activeBridge: null
      usersToken: string
      usersName: null
    }

const tokenId = {
  sub: 'auth0|1234',
  preferred_username: 'NotGrumpy',
  nickname: 'Grumpy',
  name: 'Grumplton The Third',
}

export default function RegTrollfile() {
  const { getIdTokenClaims } = useAuth0()

  const [form, setForm] = useState<FormState>({
    activeBridge: null,
    usersToken: '',
    usersName: null,
  })

  const {
    data: bridges,
    isPending: bridgesPending,
    isError: bridgesIsError,
    error: bridgesError,
  } = useBridges()

  const {
    data: favourites = [],
    isPending: favsPending,
    isError: favsIsError,
    error: favsError,
  } = useFavourites(form.usersToken)

  useEffect(() => {
    const checkUserToken = async () => {
      // const tokenId = await getIdTokenClaims()
      if (tokenId?.sub && bridges) {
        setForm({
          activeBridge: bridges.find(
            (bridge) => bridge.activeByUsers === tokenId.sub,
          ),
          usersName:
            tokenId.preferred_username ||
            tokenId.nickname ||
            tokenId.name ||
            null,
          usersToken: tokenId?.sub,
        })
      }
    }

    checkUserToken()
  }, [
    getIdTokenClaims,
    bridges,
    favourites,
    form.usersToken,
    form.activeBridge,
  ])

  if (bridgesPending || favsPending) {
    return <p>Checking Status...</p>
  }

  if (favsIsError) {
    return <p>Something went wrong {favsError.message}</p>
  }

  if (bridgesIsError) {
    return <p>Something went wrong {bridgesError.message}</p>
  }

  return (
    <>
      <section>
        <h1>{`${form.usersName}'s Trollfile`}</h1>
      </section>
      <section>
        <h2>Currently Patrolling:</h2>
        {form.activeBridge !== null && form.activeBridge !== undefined && (
          <div key={form.activeBridge.id} aria-label={form.activeBridge.name}>
            <Link to={`/bridges/${form.activeBridge.id}`}>
              <img
                src={form.activeBridge.imagePath}
                alt={form.activeBridge.name}
              />
              <h3>{form.activeBridge.name}</h3>
            </Link>
            <Status id={form.activeBridge.id} />
          </div>
        )}
      </section>
      <section>
        <h2>Favourites:</h2>
        <ul>
          {favourites?.map((favourite) => {
            if (!(favourite.bridgesId === form.activeBridge?.id))
              return (
                <RegFavouritesCard
                  key={favourite.bridgesId}
                  id={favourite.bridgesId}
                />
              )
          })}
        </ul>
      </section>
    </>
  )
}
