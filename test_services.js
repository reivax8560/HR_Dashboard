import fetchServices from './src/services/servicesService.js';

async function testFetch() {
  try {
    const data = await fetchServices();
    console.log("Services data:", data);
  } catch (error) {
    console.error("Error fetching services:", error);
  }
}

testFetch();
