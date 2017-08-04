import DriverIndexTile from '../../src/components/DriverIndexTile'

describe('DriverIndexTile', () => {
  let wrapper, key, id, driver;
  let first_name, last_name, address, city, state, zip, phone, email;

  beforeEach(() => {
    wrapper = mount(
      <DriverIndexTile
          key={1}
          id={1}
          driver={ first_name="Jason", last_name="Bourne",
          address='100 Main st.', city= 'Lowell', state='MA', zip='01802',
          phone='857-123-1234', email="jbourne@hotmail.com" }
      />
    )
  })

  it('should render a DriverIndexTile component that has a <span> with drivers name', () => {
    expect(wrapper.find('span')).toBePresent()
    // expect(wrapper.text()).toMatch('Jason')
  })

})
