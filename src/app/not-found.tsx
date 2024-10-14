import React from 'react'

export default function NotFound() {
    return (
        <section className={'p-6'}>
            <hr className={'mb-2 ' +
                'sm:visible md:hidden'} />
            <h2 className={'mb-4'}>
                404: Page not found
            </h2>
            <p>
                Sorry, we couldn&apos;t find the page you&apos;re looking for.
            </p>
        </section>
    )
}