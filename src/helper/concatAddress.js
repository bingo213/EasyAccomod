export default function concatAddress(address) {
  return `Số nhà ${address.houseNumber}, đường ${address.street}, ${address.village}, ${address.district}, ${address.province}`;
}
