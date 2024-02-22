export const colorBySimilarity = (str: string, similarity: number) => {
    if (similarity < 0.2) {
      return '<span style="color:red">' + str + '</span>';
    } else if (similarity < 0.4) {
      return '<span style="color:orange">' + str + '</span>';
    } else if (similarity < 0.6) {
      return '<span style="color:yellow">' + str + '</span>';
    } else if (similarity < 0.8) {
      return '<span style="color:green">' + str + '</span>';
    } else {
      return '<span style="color:blue">' + str + '</span>';
    }
  }

export const getSimilarity = async (sentence1: string, sentence2: string) => {
    if (sentence1 === '' || sentence2 === '') {
      console.log('empty sentence');
      return 0;
    }
  
    const response = await fetch('/api/sentence_similarity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sentence1,
        sentence2
      })
    });
  
    const data = await response.json();
    console.log(data);
    return data;
  }