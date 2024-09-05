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
      usersName: string | null
      userToken: string
    }
  | {
      activeBridge: null
      usersName: null
      userToken: string
    }

export default function RegTrollfile() {
  const { user, getAccessTokenSilently } = useAuth0()

  const [form, setForm] = useState<FormState>({
    activeBridge: null,
    usersName: null,
    userToken: 'wait',
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
  } = useFavourites(form.userToken)

  useEffect(() => {
    const checkUserToken = async () => {
      await getAccessTokenSilently()
        .catch(() => {
          console.error('Login Required')
          return 'undefined'
        })
        .then((tokenId) => {
          if (bridges) {
            setForm({
              activeBridge: bridges.find(
                (bridge) => bridge.activeByUsers === user?.sub,
              ),
              usersName: user?.preferred_username || user?.name || null,
              userToken: tokenId,
            })
          }
        })
    }

    checkUserToken()
  }, [
    bridges,
    form.activeBridge,
    user?.preferred_username,
    user?.name,
    getAccessTokenSilently,
    user?.sub,
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
      <div className="container">
        <section className=" flex flex-row gap-1 py-2">
          <img
            className="size-20 rounded-full"
            src={user?.picture || user?.profile}
            alt={user?.nickname || user?.name}
          />
          <h1 className="heading-1 my-4">{`${form.usersName}'s Trollfile`}</h1>
        </section>
        <h2>Currently Patrolling:</h2>
        <section className="grid grid-cols-2 gap-1 border-purple-900">
          {form.activeBridge !== null && form.activeBridge !== undefined && (
            <div key={form.activeBridge.id} aria-label={form.activeBridge.name}>
              <Link to={`/bridges/${form.activeBridge.id}`}>
                <img
                  className="max-h-md w-full object-cover"
                  alt={`${form.activeBridge.name} during the daytime`}
                  src={`/bridges/${form.activeBridge.imagePath}`}
                />
                <h2 className="heading-3">{form.activeBridge.name}</h2>
              </Link>
              <div className="flex flex-row gap-1 py-2">
                <Status id={form.activeBridge.id} />
              </div>
            </div>
          )}
        </section>
        <section>
          <h2>Favourites:</h2>
          <div className="container">
            <ul className="grid grid-cols-3 gap-4 border-purple-900">
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
          </div>
        </section>
      </div>
    </>
  )
}
