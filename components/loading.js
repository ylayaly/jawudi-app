export default function Loading(){
    return <div className="loading mt-8 d:mt-12 xxl:mt-18">
        {[...Array(12)].map((_, i) =>
            <div key={i}></div>
        )}
    </div>
}