(async () => {
  const fetchJson = async (url, opts = {}) => {
    url = `/api/v1${url}`;
    try {
      Object.assign(opts || {}, {
        headers: Object.assign(opts.headers || {}, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }),
      });
      const rawResponse = await fetch(url, opts);
      const content = await rawResponse.json();
      console.log(opts.method, url, content);
      return content;
    } catch (e) {
      console.error('Error', e || e.message);
    }
  };

  /*
    // report
    const makeReport = async () => {
      const books = await fetchJson('/api/v1/books', {method: 'GET'});
      const now = Date.now();
      //const endOfToday = (new Date()).setHours(23, 59, 59, 999);
      const oneDay = 24 * 60 * 60 * 1000;

      const report = books.map(book => {

        if (book.borrowed) {
          const borrowedAt = new Date(book.lastBorrowTime).getTime();
          const dueDate = (new Date(borrowedAt + 7 * oneDay)).setHours(23, 59, 59, 999);
          const overdue = now >= dueDate;
          return {
            'Book Title': book.title,
            'Borrowed By': book.lastBorrowedBy,
            'Total Borrowing': book.borrowCount,
            'Due Date': (new Date(dueDate)).toDateString(),
            'Overdue': overdue
          }
        } else {
          return {
            'Book Title': book.title,
            'Total Borrowing': book.borrowCount
          }
        }
      });

      console.table(report);

    };

    const book = await fetchJson('/api/v1/books', {
      method: 'POST',
      body: JSON.stringify({book: {title: 'book1', author: 'author1', published: 1999, bla: true}})
    });

    const id = book._id;

    await fetchJson('/api/v1/books', {method: 'GET'});

    await fetchJson(`/api/v1/books/${id}`, {method: 'GET'});

    let bookMod = await fetchJson(`/api/v1/books/${id}`, {
      method: 'PUT',
      body: JSON.stringify({book: {title: 'book222', published: 888, bla: true}})
    });

    console.log('should be 1 or more books');
    await fetchJson('/api/v1/books?title=book222', {method: 'GET'});
    console.log('should be no books');
    await fetchJson('/api/v1/books?title=book111', {method: 'GET'});


    await fetchJson(`/api/v1/books/${id}/borrow/I am`, {method: 'PATCH'});
    console.log('next should fail');
    await fetchJson(`/api/v1/books/${id}/borrow/I am`, {method: 'PATCH'});

    await makeReport();

    await fetchJson(`/api/v1/books/${id}/return`, {method: 'PATCH'});
    console.log('next should fail');
    await fetchJson(`/api/v1/books/${id}/return`, {method: 'PATCH'});

    await fetchJson(`/api/v1/books/${id}`, {method: 'DELETE'});
    console.log('next should fail');
    await fetchJson(`/api/v1/books/${id}`, {method: 'DELETE'});

  */

})();