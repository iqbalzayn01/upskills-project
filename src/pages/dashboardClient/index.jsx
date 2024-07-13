import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { userLogged } from '../../redux/auth/actions';
import { fetchAllRegistration } from '../../redux/registration/actions';
import { fetchAllSchedules } from '../../redux/schedules/actions';

import formatPrice from '../../utils/formatPrice';
import formatDateTime from '../../utils/formatDateTime';
import config from '../../config';
import Header from '../../components/Header';
import CButton from '../../components/CButton';

export default function DashboardClient() {
  const { token, user } = useSelector((state) => state.auth);
  const { registrations } = useSelector((state) => state.registration);
  const { schedules } = useSelector((state) => state.schedules);
  const dispatch = useDispatch();
  const BASE_URL = config.url;

  useEffect(() => {
    if (token) {
      dispatch(userLogged());
      dispatch(fetchAllRegistration());
      dispatch(fetchAllSchedules());
    }
  }, [token, dispatch]);

  const handleButtonAction = () => {
    console.log('TEST');
  };

  if (!token) return <Navigate to="/signin" replace />;

  return (
    <>
      <Header />
      <main>
        <div className="container-base p-5">
          <div className="flex flex-col gap-5 w-full">
            <h1 className="font-semibold text-3xl">My Dashboard</h1>
            <div className="flex gap-5 p-6 mb-5 shadow-md border border-slate-300 rounded-xl">
              {token && (
                <>
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full border border-gray-300"
                  />
                  <div className="flex flex-col justify-center gap-3">
                    <div>
                      <p className="text-sm text-gray-500">Nama</p>
                      <p className="font-medium text-2xl text-gray-700">
                        {user.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-lg text-gray-700">
                        {user.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nomor Telepon</p>
                      <p className="font-medium text-lg text-gray-700">
                        {user.no_telp}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="font-medium text-lg text-gray-700">
                        {user.role}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
            <h1 className="font-semibold text-3xl">
              Kegiatan Pelatihan Yang Diikuti
            </h1>
            {/* My Events */}
            <div className="flex gap-5 p-6 mb-5 shadow-md border border-slate-300 rounded-xl">
              {registrations && registrations.length > 0 ? (
                registrations
                  .filter((register) => register.userID._id === user._id)
                  .map((register, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 gap-5 p-6 bg-secondarycolor rounded-xl"
                    >
                      {schedules &&
                        schedules
                          .filter(
                            (schedule) =>
                              schedule.eventID._id === register.eventID._id
                          )
                          .map((schedule, index) => (
                            <div key={index}>
                              <div className="col-span-1">
                                {schedule.eventID.imageID &&
                                  schedule.eventID.imageID.fileName && (
                                    <img
                                      src={`${BASE_URL}${schedule.eventID.imageID.fileName}`}
                                      alt={register.eventID.name}
                                      className="w-full h-auto rounded-lg"
                                    />
                                  )}
                              </div>
                              <div className="col-span-2 flex flex-col justify-between">
                                <h2 className="text-3xl font-semibold text-primarycolor hover:underline">
                                  {schedule.eventID.name}
                                </h2>
                                <p className="text-2xl text-white mt-2">
                                  {schedule.eventID.description}
                                </p>
                                <p className="text-white mt-3">
                                  <span className="text-gray-500">Kuota:</span>{' '}
                                  {schedule.eventID.kuota}
                                </p>
                                <div className="mt-2">
                                  {schedule.schedules.map((time, subIndex) => (
                                    <div key={subIndex}>
                                      <p className="text-white">
                                        <span className="text-gray-500">
                                          Mulai:
                                        </span>{' '}
                                        {formatDateTime(time.start_time)}
                                      </p>
                                      <p className="text-white">
                                        <span className="text-gray-500">
                                          Selesai:
                                        </span>{' '}
                                        {formatDateTime(time.end_time)}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                                <p className="text-white mt-3">
                                  <span className="text-gray-500">
                                    Narasumber:
                                  </span>{' '}
                                  {schedule.talentID.name}
                                </p>
                                <p className="text-white mt-3">
                                  <span className="text-gray-500">Price:</span>{' '}
                                  Rp. {formatPrice(schedule.eventID.price)}
                                </p>
                              </div>
                              <CButton
                                onClick={handleButtonAction}
                                className="flex items-center justify-center gap-3 bg-primarycolor font-semibold text-secondarycolor text-xl px-3 py-2 rounded-lg"
                              >
                                <span>Daftar</span>
                                <svg
                                  width="11"
                                  height="11"
                                  viewBox="0 0 11 11"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M9.04579 8.02421L9.04579 8.02438C9.0459 8.20537 9.11785 8.37892 9.24583 8.5069C9.37381 8.63488 9.54736 8.70683 9.72835 8.70694H9.72873C9.90972 8.70683 10.0833 8.63488 10.2112 8.5069C10.3392 8.37892 10.4112 8.20537 10.4113 8.02438L10.4113 8.02419L10.4113 1.52464L10.4113 1.52446C10.4112 1.34346 10.3392 1.16992 10.2112 1.04193C10.0833 0.913954 9.90972 0.842005 9.72873 0.841892L9.72854 0.841892L3.22899 0.841892L3.22899 0.841705L3.21841 0.842079C3.04155 0.848322 2.87402 0.922968 2.75111 1.05029C2.6282 1.17761 2.55951 1.34767 2.55951 1.52464C2.55951 1.70161 2.6282 1.87167 2.75111 1.99899C2.87402 2.12632 3.04155 2.20096 3.21841 2.20721L3.2184 2.20739L3.22897 2.20739L8.0795 2.20779L1.3017 8.98559C1.17362 9.11367 1.10166 9.28739 1.10166 9.46853C1.10166 9.64967 1.17362 9.82339 1.3017 9.95148C1.42979 10.0796 1.60351 10.1515 1.78465 10.1515C1.96579 10.1515 2.13951 10.0796 2.2676 9.95148L9.0454 3.17368L9.04579 8.02421Z"
                                    fill="#002333"
                                    stroke="#002333"
                                    strokeWidth="0.6"
                                  />
                                </svg>
                              </CButton>
                            </div>
                          ))}
                    </div>
                  ))
              ) : (
                <p className="text-center text-gray-500">
                  Belum ada kegiatan pelatihan yang diikuti
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
