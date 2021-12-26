export default function (context, inject) {
  const applicationId = 'QTILNQUB0M';
  const searchApiKey = '13f012459dff8bde1619306f57d58286';
  const headers = {
    'X-Algolia-API-Key': searchApiKey,
    'X-Algolia-Application-Id': applicationId,
  };

  inject('dataApi', { getHome, getReviews, getUsers, getHomes });

  async function getHome(homeId) {
    try {
      const response = await fetch(
        `https://${applicationId}.algolia.net/1/indexes/_homes/${homeId}`,
        {
          headers,
        }
      );
      return await envelope(response);
    } catch (error) {
      return getErrorDetails(error);
    }
  }

  async function getReviews(homeId) {
    try {
      const response = await fetch(
        `https://${applicationId}.algolia.net/1/indexes/_reviews/query`,
        {
          headers,
          method: 'POST',
          body: JSON.stringify({
            filters: `homeId:${homeId}`,
            hitsPerPage: 5,
            attributesToHighlight: [],
          }),
        }
      );
      return await envelope(response);
    } catch (error) {
      return getErrorDetails(error);
    }
  }

  async function getUsers(homeId) {
    try {
      const response = await fetch(
        `https://${applicationId}.algolia.net/1/indexes/_users/query`,
        {
          headers,
          method: 'POST',
          body: JSON.stringify({
            filters: `homeId:${homeId}`,
            attributesToHighlight: [],
          }),
        }
      );
      return await envelope(response);
    } catch (error) {
      return getErrorDetails(error);
    }
  }

  async function getHomes(lat, lng, radius = 1500) {
    try {
      const response = await fetch(
        `https://${applicationId}.algolia.net/1/indexes/_homes/query`,
        {
          headers,
          method: 'POST',
          body: JSON.stringify({
            hitsPerPage: 10,
            aroundLatLng: `${lat},${lng}`,
            aroundRadius: radius,
            attributesToHighlight: [],
          }),
        }
      );
      return await envelope(response);
    } catch (error) {
      return getErrorDetails(error);
    }
  }

  async function envelope(response) {
    if (response.ok) {
      const json = await response.json();
      return { data: json, isSuccess: response.ok };
    }

    return {
      message: response.statusText,
      isSuccess: response.ok,
      status: 400,
    };
  }

  function getErrorDetails(error) {
    return { message: error.message, isSuccess: false, status: 500 };
  }
}
