'use client'

import React from 'react'

export default function Error(error: Error) {
    console.error(error)
    return (
        <section className={'p-6'}>
            <hr className={'mb-2 ' +
                'sm:visible md:hidden'} />
            <h2 className={'mb-4'}>
                500: Server error
            </h2>
            <p>
                We&apos;re experiencing technical difficulties. Please check back soon.
            </p>
        </section>
    )
}