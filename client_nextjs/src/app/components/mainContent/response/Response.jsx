import React from 'react'
import './Response.css'
import Link from 'next/link'

const Response = ({res}) => {
  return (
    <>
      <div className="response_area">
          {res == null ? (
            <div>
              <h2>Enter The Profession To Be Searched.</h2>
            </div>
          ) : res.hasOwnProperty("name") ? (
            <div>
              <h2>Profession Found!</h2>
              <div>
                <Link
                  href={`/routes/profession/${encodeURIComponent(
                    res.name
                  )}/${encodeURIComponent(res.city)}`}
                >
                  Profession : {res.name}
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <>
                <div className="text-center	">{res.msg.slice(0, 17)}</div>
                <div>{res.msg.slice(18, 47)}</div>
                <Link href={'/routes/createProfession'}>
                {res.msg.slice(47)}
                </Link>
              </>
            </div>
          )}
        </div>
    </>
  )
}

export default Response