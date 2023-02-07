import React from 'react'

const Tags = ({ data }) => {
  var tags = data.tags.filter(tag => tag.tag.data).map(tag => tag.tag.data)

  return (
    tags.length > 0 && <section className='richtext px-9 md:px-12 lg:px-20 xl:px-24 3xl:px-46 pt-4 lg:pt-6'>
    <div className='3xl:container mx-auto text-2 sm:text-xs lg:text-base flex flex-wrap gap-2 lg:gap-4 font-lato text-jw-dark-blue p-post'>
      {tags.map((tag, key) => {
        return (
            <span key={"tag"+key} className='border border-jw-green-4 rounded-[9px] py-[6px] lg:py-3 px-[10px] lg:px-6 font-semibold uppercase tracking-lg'>{tag.name}</span>
        )
      })}
    </div>
  </section>
)}

export default Tags