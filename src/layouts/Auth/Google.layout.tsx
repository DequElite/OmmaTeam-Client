import Loading from "../../components/Loading/Loading.component";

export default function GoogleLayout() {
  return (
    <>
        <div 
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'start',
                width: '100%',
                height: '100%'
            }}
        >
            <Loading></Loading>
        </div>
    </>
  );
}