import React, { useEffect, useState } from "react";
import axios from "axios";

function AutoAddress({ register }) {
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);

  useEffect(() => {
    const getProvince = async () => {
      await axios
        .get("https://vapi.vnappmob.com/api/province")
        .then((response) => setProvince(response.data.results))
        .catch((error) => console.log(error));
    };

    getProvince();
  }, []);

  const [provinceId, setProvinceId] = useState(0);
  useEffect(() => {
    if (provinceId !== 0) {
      const getDistrict = async () => {
        await axios
          .get(`https://vapi.vnappmob.com/api/province/district/${provinceId}`)
          .then((response) => setDistrict(response.data.results))
          .catch((error) => console.log(error));
      };

      getDistrict();
    }
  }, [provinceId]);
  //   console.log(district);
  const [districtId, setDistrictId] = useState(0);
  useEffect(() => {
    if (districtId !== 0) {
      const getWard = async () => {
        await axios
          .get(`https://vapi.vnappmob.com/api/province/ward/${districtId}`)
          .then((response) => setWard(response.data.results))
          .catch((error) => console.log(error));
      };

      getWard();
    }
  }, [districtId]);

  const handleProvinceChange = (e) => {
    let province_name = e.target.value;
    let id = province.find(function (p) {
      return p.province_name === province_name;
    }).province_id;

    setProvinceId(id);
  };

  const handleDistrictChange = (e) => {
    let district_name = e.target.value;
    let id = district.find(function (d) {
      return d.district_name === district_name;
    }).district_id;

    setDistrictId(id);
  };

  return (
    <div>
      <label>
        Tỉnh/Thành phố
        <select name="province" ref={register} onChange={handleProvinceChange}>
          {province.map((p) => (
            <option value={p.province_name} key={p.province_id}>
              {p.province_name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Quận/Huyện
        <select name="district" onChange={handleDistrictChange} ref={register}>
          {district.map((d) => (
            <option value={d.district_name} key={d.district_id}>
              {d.district_name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Xã/Phường
        <select name="village" ref={register}>
          {ward.map((w) => (
            <option value={w.ward_name} key={w.ward_id}>
              {w.ward_name}
            </option>
          ))}
        </select>
      </label>
      <label>Tên đường
        <input type="text" name="street" ref={register} />
      </label>
      <label>Số nhà
        <input type="number" name="houseNumber"  ref={register} />
      </label>
    </div>
  );
}

export default AutoAddress;
